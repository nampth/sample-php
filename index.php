<?php
/**
 * Created by PhpStorm.
 * User: Nampth
 * Date: 5/8/2019
 * Time: 4:18 PM
 */

$uri = $_SERVER['REQUEST_URI'];
if(!isset($_SESSION['user'])) {
    require __DIR__ . '/routes/login.php';
}else{

}
