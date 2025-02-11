<?php

declare(strict_types=1);

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Exception\HttpUnauthorizedException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Util\Utils;

class AuthMiddleware
{
    public function __construct() {}

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $params = $request->getServerParams();
        $authorization = $params['HTTP_AUTHORIZATION'] ?? '';
        $token = (!empty($authorization)) ? explode(' ', $authorization)[1] : '';

        if (!empty($token)) {
            try {
                //no caso de falhar a decodificação entra na exceção
                JWT::decode($token, new Key($_ENV['SECRET_KEY_JWT'], 'HS256'));
                $response = $handler->handle($request);
                return $response;

            } catch (\Exception $e) {
                throw new HttpUnauthorizedException($request, 'Unauthorized: '.$e->getMessage());
            }

        } else {
            throw new HttpUnauthorizedException($request,message: 'Unauthorized');
        }    
    }
 
}