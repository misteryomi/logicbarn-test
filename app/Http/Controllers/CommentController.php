<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogComment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    function __construct(BlogComment $comment) {
        $this->comment = $comment;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request  $request
     * @param Blog $blog
     * @return Inertia
     */
    public function store(Request $request, Blog $blog) {
        $request->validate([
            'guest_name' => ['required', 'max:50'],
            'guest_email' => ['required', 'email'],
            'comment' => ['required'],
        ]);

        $blog->comments()->create($request->only('guest_name', 'guest_email', 'comment'));

        return redirect()->route('blogs.show', ['blog' => $blog]);
    }
}
