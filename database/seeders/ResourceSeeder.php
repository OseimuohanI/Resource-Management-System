<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ResourceSeeder extends Seeder
{
    public function run(): void
    {
        $resources = [
            [
                'name' => 'Conference Room A',
                'type' => 'Room',
                'status' => 'Available',
                'quantity' => 1,
            ],
            [
                'name' => 'Conference Room B',
                'type' => 'Room',
                'status' => 'In Use',
                'quantity' => 1,
            ],
            [
                'name' => 'Projector - Epson EB-2250U',
                'type' => 'Equipment',
                'status' => 'Available',
                'quantity' => 5,
            ],
            [
                'name' => 'Laptop - Dell XPS 15',
                'type' => 'Equipment',
                'status' => 'Available',
                'quantity' => 12,
            ],
            [
                'name' => 'Laptop - MacBook Pro',
                'type' => 'Equipment',
                'status' => 'Available',
                'quantity' => 8,
            ],
            [
                'name' => 'Company Van',
                'type' => 'Vehicle',
                'status' => 'Maintenance',
                'quantity' => 1,
            ],
            [
                'name' => 'Delivery Truck',
                'type' => 'Vehicle',
                'status' => 'Available',
                'quantity' => 2,
            ],
            [
                'name' => 'Office Desk - Standing',
                'type' => 'Furniture',
                'status' => 'Available',
                'quantity' => 20,
            ],
            [
                'name' => 'Ergonomic Chair',
                'type' => 'Furniture',
                'status' => 'Available',
                'quantity' => 30,
            ],
            [
                'name' => 'Whiteboard - Large',
                'type' => 'Equipment',
                'status' => 'Available',
                'quantity' => 10,
            ],
            [
                'name' => 'Video Camera - Sony FX3',
                'type' => 'Equipment',
                'status' => 'In Use',
                'quantity' => 3,
            ],
            [
                'name' => 'Meeting Table',
                'type' => 'Furniture',
                'status' => 'Available',
                'quantity' => 8,
            ],
            [
                'name' => 'Microphone Set',
                'type' => 'Equipment',
                'status' => 'Available',
                'quantity' => 6,
            ],
            [
                'name' => 'Training Room',
                'type' => 'Room',
                'status' => 'Reserved',
                'quantity' => 1,
            ],
            [
                'name' => 'Desktop Computer',
                'type' => 'Equipment',
                'status' => 'Available',
                'quantity' => 15,
            ],
        ];

        foreach ($resources as $resource) {
            Resource::create([
                'name' => $resource['name'],
                'slug' => Str::slug($resource['name']),
                'type' => $resource['type'],
                'status' => $resource['status'],
                'quantity' => $resource['quantity'],
                'resourceid' => null,
            ]);
        }
    }
}
