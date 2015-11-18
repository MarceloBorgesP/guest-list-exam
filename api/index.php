<?php
require 'vendor/autoload.php';
require 'database/ConnectionFactory.php';
require 'guest/GuestService.php';

$app = new \Slim\Slim();

$app->get('/guests/', function() use ( $app ) {
    $guests = GuestService::listGuests();
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($guests);
});

$app->get('/guests/:id', function($id) use ( $app ) {
    $guest = GuestService::getById($id);
    
    if($guest) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($guest);
    }
    else {
        $app->response()->setStatus(204);
    }
});

$app->post('/guests/', function() use ( $app ) {
    $guestJson = $app->request()->getBody();
    $newGuest = json_decode($guestJson, true);
    if($newGuest) {
        $guest = GuestService::add($newGuest);
        echo "{$guest['name']} was added to your Guestlist";
    }
    else {
        $app->response->setStatus(400);
        echo "Malformat JSON";
    }
});

$app->put('/guests/', function() use ( $app ) {
    $guestJson = $app->request()->getBody();
    $updatedGuest = json_decode($guestJson, true);
    
    if($updatedGuest && $updatedGuest['id']) {
        if(GuestService::update($updatedGuest)) {
          echo "Guest {$updatedGuest['name']} updated";  
        }
        else {
          $app->response->setStatus('404');
          echo "There is no such guest";
        }
    }
    else {
        $app->response->setStatus(400);
        echo "Malformat JSON";
    }
});

$app->delete('/guests/:id', function($id) use ( $app ) {
    if(GuestService::delete($id)) {
      echo "Guest with id = $id was deleted";
    }
    else {
      $app->response->setStatus('404');
      echo "Guest with id = $id not found";
    }
});

$app->run();
?>