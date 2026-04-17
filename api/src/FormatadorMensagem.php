<?php declare(strict_types=1);

class FormatadorMensagem
{
    /**
     * @param string[] $erros
     */
    public static function formatarMensagemErro(array $erros): string
    {
        return array_reduce($erros, function ($carry, $item) {
            if (!$carry) {
                return $item;
            }

            return $carry . PHP_EOL . $item;
        });
    }
}
