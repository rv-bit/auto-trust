<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;

use App\Notifications\GenericNotification;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Notification as NotificationFacade;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()->notifications()->latest()->paginate(20);

        return NotificationResource::collection($notifications);
    }

    public function markSeen(Request $request, $id)
    {
        $dbNotification = DatabaseNotification::find($id);

        if (!$dbNotification || $dbNotification->notifiable_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $dbNotification->markAsRead();

        return new NotificationResource($dbNotification->fresh());
    }

    public function markAllSeen(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json(['message' => 'OK'], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'notifiable_type' => 'required|string',
            'notifiable_id' => 'required|integer',
            'data' => 'nullable|array',
        ]);

        // Create a database notification by using the notifiable model ->notify()
        $notifiableClass = $data['notifiable_type'];
        $notifiable = $notifiableClass::find($data['notifiable_id']);

        if (!$notifiable) {
            return response()->json(['message' => 'Notifiable not found'], 404);
        }

        // Use a simple generic notification using Notification facade
        NotificationFacade::send($notifiable, new GenericNotification($data['type'], $data['data'] ?? []));

        return response()->json(['message' => 'OK'], 200);
    }
}
