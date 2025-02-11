<?php

declare(strict_types=1);

use Slim\Factory\AppFactory;
use DI\ContainerBuilder;
use Slim\Handlers\Strategies\RequestResponseArgs;
use App\Middleware\JsonResponseHeaderMiddleware;

define('APP_ROOT', dirname(__DIR__));

require APP_ROOT . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__)); // Load Configs .env
$dotenv->load();

$builder = new ContainerBuilder; // Dependency Injection

$container = $builder->addDefinitions(APP_ROOT . '/config/definitions.php')
                     ->build();

AppFactory::setContainer($container);
$app = AppFactory::create();

$collector = $app->getRouteCollector();
$collector->setDefaultInvocationStrategy(new RequestResponseArgs); // Get Params ($_GET, $_REQUEST, $_POST);

$app->addBodyParsingMiddleware(); //Middleware for request datas

$error_middleware = $app->addErrorMiddleware(true, true, true); // Middleware for error messages
$error_handler = $error_middleware->getDefaultErrorHandler();
$error_handler->forceContentType('application/json');

$app->add(new JsonResponseHeaderMiddleware); // Middleware for response headers

$routes = glob(APP_ROOT . '/src/App/Routes/*.php'); // Instance all root routes

foreach ($routes as $route) {
    require $route;
}

$app->run();
