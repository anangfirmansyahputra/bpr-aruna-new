<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::all();

        return Inertia::render('news/index', ['news' => $news]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('news/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = $request->validate([
            'title' => 'required|string|unique:news,title',
            'meta_description' => 'required|string',
            'keywords' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);
        try {


            $imagePath = $request->file('image_url')->store('news', 'public');

            News::create([
                'title' => $validate['title'],
                'meta_description' => $validate['meta_description'],
                'keywords' => $validate['keywords'],
                'content' => $validate['content'],
                'slug' => Str::slug($validate['title']),
                'image_url' => $imagePath,
            ]);

            return to_route('news.index')->with('success', 'Berita berhasil dibuat');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Berita gagal dibuat');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $news = News::findOrFail($id);
        return Inertia::render('news/form', ['news' => $news]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $news = News::findOrFail($id);

        $validate = $request->validate([
            'title' => "required|string|unique:news,title,{$id}",
            'meta_description' => 'required|string',
            'keywords' => 'required|string',
            'content' => 'required|string',
            'image_url' => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif,webp', 'max:2048'],
                    ['string', 'url']
                )
            ]
        ]);

        if ($request->hasFile('image_url')) {
            $validate['image_url'] = $request->file('image_url')->store('products', 'public');
        } else {
            unset($validate['image_url']);
        }

        try {
            $validate['slug'] = Str::slug($validate['title']);
            $news->update($validate);

            return to_route('news.index')->with('success',  'Berita berhasil di update');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Berita gagal diupdate');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return redirect()->route('news.index')->with('success', 'Berita berhasil dihapus');
    }
}
