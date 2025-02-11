<?php

declare(strict_types=1);

namespace App\Util;

class Utils
{
    public static function encrypt(string $text)
    {
        $key = hex2bin($_ENV['PERMISSION_DECRYPT_KEY']);
        $iv = hex2bin($_ENV['IV']);
        $encrypted = openssl_encrypt($text, 'AES-128-CBC', $key, 0, $iv);
        return $encrypted;
    }

    public static function decrypt(string $text)
    {
        $key = hex2bin($_ENV['PERMISSION_DECRYPT_KEY']);
        $iv = hex2bin($_ENV['IV']);
        $decrypted = openssl_decrypt($text, 'AES-128-CBC', $key, 0, $iv);
        return $decrypted;
    }

}
