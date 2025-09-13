<?php

namespace App\Http\Controllers\root;

use App\Http\Controllers\Controller;

use Inertia\Inertia;
use Inertia\Response;

class RootController extends Controller
{
    public function index()
    {
        return Inertia::render('landing/index', []);
    }
}
