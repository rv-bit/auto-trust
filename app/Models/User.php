<?php

namespace App\Models;

use App\Models\Chat\Message;

use App\Http\Resources\Chat\MessageResource;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

use Spatie\Permission\Traits\HasRoles;

use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function getUsersExceptUser(User $user)
    {
        $userId = $user->id;
        $query = User::select(['users.*', 'messages.message as last_message', 'messages.created_at as last_message_date'])
            ->where('users.id', '!=', $userId)
            ->when(!$user->is_admin, function ($query) {
                $query->whereNull('users.blocked_at');
            })
            ->leftJoin('conversations', function ($join) use ($userId) {
                $join->where(function ($query) use ($userId) {
                    // Case 1: user is user_id1 and auth user is user_id2
                    $query->whereColumn('conversations.user_id1', '=', 'users.id')
                        ->where('conversations.user_id2', '=', $userId);
                })
                ->orWhere(function ($query) use ($userId) {
                    // Case 2: user is user_id2 and auth user is user_id1
                    $query->whereColumn('conversations.user_id2', '=', 'users.id')
                        ->where('conversations.user_id1', '=', $userId);
                });
            })
            ->leftJoin('messages', 'messages.id', '=', 'conversations.last_message_id')
            ->orderByRaw('IFNULL(users.blocked_at, 1)')
            ->orderBy('messages.created_at', 'desc')
            ->orderBy('users.name');

        return $query->get();
    }

    public function toConversationArray()
    {
        // Get unseen messages for this conversation
        $unseenMessages = Message::with('sender')
            ->where('sender_id', $this->id)
            ->where('receiver_id', auth()->id())
            ->whereNull('seen_at')
            ->orderBy('created_at', 'asc')
            ->get();

        // Convert to resource
        $unseenMessagesResource = $unseenMessages->map(function($message) {
            return new MessageResource($message);
        });

        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : null,
            'is_user' => true,
            'is_admin' => (bool) $this->is_admin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'blocked_at' => $this->blocked_at,
            'last_message' => $this->last_message,
            'last_message_date' => $this->last_message_date ? $this->last_message_date . ' UTC' : null,
            'unseen_messages' => $unseenMessagesResource,
        ];
    }

    /**
     * Get unseen notifications count for the user.
     */
    public function unseenNotificationsCount(): int
    {
        return $this->unreadNotifications()->count();
    }

    /**
     * Get latest notifications for the user.
     */
    public function latestNotifications($limit = 10)
    {
        return $this->notifications()->latest()->limit($limit)->get();
    }
}