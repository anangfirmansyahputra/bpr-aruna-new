<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('categories/index', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('categories/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|unique:categories,name'
        ]);

        try {

            Category::create([
                'name' => $request->name
            ]);

            return redirect()->route('categories.index')->with('success', 'Kategori berhasil dibuat');
        } catch (\Exception $e) {
            return back()->withErrors(['name' => 'Gagal membuat kategori. Mungkin ada nama category yang sama']);
        }
    }

    public function edit(string $id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('categories/form', [
            'category' => $category
        ]);
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $validate = $request->validate([
            'name' => "required|min:3|unique:categories,name,{$id}"
        ]);

        try {
            $category->update([
                'name' => $request->name
            ]);

            return to_route('categories.index');
        } catch (\Exception $e) {
            return back()->withErrors(['name' => 'Failed to update category']);
        }
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Delete category berhasil');
    }
}
