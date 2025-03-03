<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reports = Report::all();

        return Inertia::render('reports/index', ['reports' => $reports]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('reports/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => ['required', 'string'],
            'file' => ['required', 'file'],
        ]);

        $validate['file'] = $request->file('file')->store('reports', 'public');

        try {
            Report::create($validate);
            return to_route('reports.index')->with('success', 'Laporan keuangan berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Laporan keuangan gagal ditambahkan');
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
        $report = Report::findOrFail($id);
        return Inertia::render('reports/form', ['report' => $report]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $report = Report::findOrFail($id);

        $validate = $request->validate([
            'title' => ['required', 'string'],
            'file' => [
                Rule::when(
                    $request->hasFile('file'),
                    ['file'],
                    ['string', 'url']
                )
            ]
        ]);

        if ($request->hasFile('file')) {
            $validate['file'] = $request->file('file')->store('reports', 'public');
        } else {
            unset($validate['file']);
        }

        try {
            $report->update($validate);
            return to_route('reports.index')->with('success', 'Laporan keuangan berhasil diupdate');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Laporan keuangan gagal diupdate');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $report = Report::findOrFail($id);
        $report->delete();
        return redirect()->route('reports.index')->with('success', 'Laporan keuangan berhasil dihapus');
    }
}
