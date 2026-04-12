<?php declare(strict_types=1);

class FormatadorMensagem
{
    public static function formatarMensagemErro(array $erros)
    {
        return array_reduce($erros, function ($carry, $item) {
            if (!$carry) {
                return $item;
            }

            return $carry . PHP_EOL . $item;
        });
    }
}
