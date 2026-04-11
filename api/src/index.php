<?php declare(strict_types=1);

require_once 'vendor/autoload.php';

use phputil\router\Router;

use function phputil\cors\cors;

$app = new Router();
$app->use(cors());
