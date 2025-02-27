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

            return to_route('categories.index');
        } catch (\Exception $e) {
            return back()->withErrors(['name' => 'Failed to create category. It might already exist.']);
        }
    }
}
