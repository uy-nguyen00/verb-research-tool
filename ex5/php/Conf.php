<?php

class Conf {
    private static $database = array(
        'hostname' => 'localhost',
        'database' => 'td_js',
        'login'    => 'root',
        'password' => 'root'
    );

    static public function getLogin() {
        return self::$database['login'];
    }

    static public function getHostname() {
        return self::$database['hostname'];
    }

    static public function getDatabase() {
        return self::$database['database'];
    }

    static public function getPassword() {
        return self::$database['password'];
    }

}
