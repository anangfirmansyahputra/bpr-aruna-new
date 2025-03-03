<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Report extends Model
{
    protected $fillable = [
        'title',
        'file'
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::get(fn($value) => \Carbon\Carbon::parse($value)->format('d M Y H:i'));
    }

    protected function file(): Attribute
    {
        return Attribute::get(fn($value) => $value ? env('APP_URL')  . '/storage/' . $value : null);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($report) {
            if ($report->file) {
                Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $report->file));
            }
        });

        static::updating(function ($report) {
            if ($report->isDirty('file')) {
                $oldImage = $report->getOriginal('file');

                if ($oldImage) {
                    Storage::disk('public')->delete(str_replace(env('APP_URL') . '/storage/', '', $oldImage));
                }
            }
        });
    }
}
