<?php declare(strict_types=1);

class FormatadorMensagem
{
    /**
     * @param string[] $erros
     */
    public static function formatarMensagemErro(array $erros): string
    {
        return implode(PHP_EOL, $erros);
    }
}
