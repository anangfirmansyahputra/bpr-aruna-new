<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->get();
        return Inertia::render('products/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('products/form', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'calculator_name' => 'nullable|string|max:255',
            'is_credit' => 'boolean',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        try {
            if ($request->hasFile('image_url')) {
                $validated['image_url'] = $request->file('image_url')->store('products', 'public');
            }

            Product::create($validated);

            return to_route('products.index')->with('success', 'Produk berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Produk gagal ditambahkan');
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
        $categories = Category::all();
        $product = Product::findOrFail($id);
        return Inertia::render('products/form', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());

        $product = Product::find($id);

        $validate = $request->validate([
            'name' => "required|string|min:3|unique:products,name,{$id}",
            'category_id' => 'required|integer',
            'calculator_name' => 'nullable|string|max:255',
            'is_credit' => 'boolean',
            'image_url' => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
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
            $product->update($validate);

            return to_route('products.index')->with('success',  'Produk berhasil di update');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Produk gagal diupdate');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus');
    }
}
