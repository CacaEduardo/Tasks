<?php

use App\Controllers\TasksController;
use Slim\Routing\RouteCollectorProxy;
use App\Middleware\AuthMiddleware;

$app->group('', function (RouteCollectorProxy $group) {

    $group->get('/tasks', TasksController::class. ':all');
    $group->post('/tasks', TasksController::class. ':create');
    $group->put('/tasks/{id}', TasksController::class. ':update');
    $group->delete('/tasks/{id}', TasksController::class. ':delete');

});
// ->add(AuthMiddleware::class);