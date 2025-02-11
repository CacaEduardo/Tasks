<?php

declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\TasksRepository;
use Valitron\Validator;
class TasksController
{
    public function __construct(private TasksRepository $repository, private Validator $validator)
    {
        $this->validator->mapFieldsRules([
            'title' => ['required'],
            'description' => ['required'],
            'status' => ['required'],
        ]);
    }

    public function all(Request $request, Response $response): Response
    {
        $data = $this->repository->getAll();
    
        $body = json_encode([
            'success' => true,
            'data' => $data
        ]);
    
        $response->getBody()->write($body);
    
        return $response;
    }

    public function create(Request $request, Response $response): Response
    {
        $body = $request->getParsedBody();

        $this->validator = $this->validator->withData($body);

        if (!$this->validator->validate()) {
            $response->getBody()
                     ->write(json_encode($this->validator->errors()));

            return $response->withStatus(422);
        }

        $id = $this->repository->create($body);

        $body = json_encode([
            'message' => 'task created',
            'success' => true,
            'id' => $id
        ]);

        $response->getBody()->write($body);

        return $response->withStatus(201);
    }

    public function update(Request $request, Response $response, string $id): Response
    {
        $body = $request->getParsedBody();

        $this->validator = $this->validator->withData($body);

        if (!$this->validator->validate()) {
            $response->getBody()
                     ->write(json_encode($this->validator->errors()));

            return $response->withStatus(422);
        }

        $updated = $this->repository->update((int) $id, $body);

        if (!$updated) { 
            $body = json_encode([
                'error' => true,
                'msg'=> 'error in update'
            ]);
            $response->getBody()->write($body);
            return $response->withStatus(500);
        }

        $body = json_encode([
            'message' => 'Product updated',
            'success' => true
        ]);

        $response->getBody()->write($body);

        return $response->withStatus(200);
    }

    public function delete(Request $request, Response $response, string $id): Response
    {
        $deleted = $this->repository->delete($id);

        if (!$deleted) { 
            $body = json_encode([
                'error' => true,
                'msg'=> 'error in delete'
            ]);
            $response->getBody()->write($body);
            return $response->withStatus(500);
        }

        $body = json_encode([
            'message' => 'Product deleted',
            'success'=> true
        ]);

        $response->getBody()->write($body);

        return $response->withStatus(200);
    }
}