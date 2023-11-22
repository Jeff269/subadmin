<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use Microsoft\Graph\GraphServiceClient;
use App\TokenStore\TokenCache;
use App\TimeZones\TimeZones;


class UsersController extends Controller
{
    public function index(){

        $viewData = $this->loadViewData();
        $graph = $this->getGraph();
        $getEventsUrl = '/users/jgarayaaa@uncp.edu.pe';
        $events = $graph
            ->createRequest('GET',$getEventsUrl)
            ->setReturnType(Model\User::class)
            ->execute();
        $viewData['users'] = $events;
        return($events);
    }

    private function getGraph(): Graph
    {
        // Get the access token from the cache
        $tokenCache = new TokenCache();
        $accessToken = $tokenCache->getAccessToken();

        // Create a Graph client
        $graph = new Graph();
        $graph->setAccessToken($accessToken);
        return $graph;
    }
}
