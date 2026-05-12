<?php declare(strict_types=1);

class RepositoryException extends RuntimeException
{
  public function __construct(string $message, int $code)
  {
    parent::__construct($message, $code);
  }
}
