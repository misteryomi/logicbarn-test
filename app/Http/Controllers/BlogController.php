<?php

namespace App\Http\Controllers;

use App\Imports\BlogsImport;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class BlogController extends Controller
{
    private $blog;

    function __construct(Blog $blog) {
        $this->blog = $blog;

        $this->middleware(function($request, $next) {
            $this->user = $request->user();

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return Inertia
     */
    public function index() {
        $blogs = $this->blog->with('user')->latest()->get();

        return Inertia::render('Welcome', [
            'blogs' => $blogs,
        ]);    
    }

    /**
     * Display a listing of the resource.
     *
     * @return Inertia
     */
    public function list() {
        $blogs = $this->blog->with('user')->latest()->get();
        
        return Inertia::render('Blog/List', [
            'blogs' => $blogs,
        ]);    
    }
    
    /**
     * Display resource.
     *
     * @param Blog  $blog
     * @return Inertia
     */
    public function show(Blog $blog) {

        return Inertia::render('Blog/Show', [
            'blog' => $blog->with('user')->first(),
            'comments' => $blog->comments,
        ]);    
    }

    /**
     * Display resource creation form
     *
     * @return Inertia
     */
    public function new() {
        return Inertia::render('Blog/New');    
    }


    /**
     * Display resource edit form
     * 
     * @param Blog  $blog
     * @return Inertia
     */
    public function edit(Blog $blog) {
        return Inertia::render('Blog/New', [
            'blog' => $blog,
            'isEdit' => true,
        ]);    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request  $request
     * @return Inertia
     */
    public function store(Request $request) {
        $request->validate([
            'title' => ['required', 'max:50'],
            'details' => ['required'],
        ]);

        $this->blog->create([
            'user_id' => $this->user->id,
            'title' => $request->title,
            'details' => $request->details,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Blog  $blog
     * @return Redirect
     */
    public function update(Request $request, Blog $blog) {
        $request->validate([
            'title' => ['required', 'max:50'],
            'details' => ['required'],
        ]);

        $blog->update([
            'title' => $request->title,
            'details' => $request->details,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Import bulk resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Redirect
     */    
    public function import(Request $request) 
    {
        $request->validate([
            'file' => ['file', 'mimes:xls,xlsx,csv'],
        ]);

        Excel::import(new BlogsImport, $request->file('file'));
        
        return redirect()->route('dashboard');
    }

}
