<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
   
    public function index() {

        return Task::all();

    }

    public function store(Request $request){

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done',
        ]);

        $task = Task::create($validated);
        return $task;

    }
    
    public function show($id){

        return Task::findOrFail($id);

    }

    public function update(Request $request, $id){

        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done',
        ]);

        $task->update($validated);
        return $task;

    }

    public function destroy($id){

        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json([
            'message' => 'Tarea eliminada correctamente'
        ]);
        
    }
}
