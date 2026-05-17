<?php declare(strict_types=1);

class Data
{
  public function __construct(public int $timestamp) {}

  public function obterValorFormatado(): string
  {
    return date('d/m/Y H:i:s', $this->timestamp);
  }
}
