<?php declare(strict_types=1);

class Compra
{
  public string $id;
  public int $numeroCompra;
  public Data $data;
  public Usuario $usuario;
  public Cefetin $total;
  /**
   * @var ItemCompra[]
   */
  public array $itens;
}
