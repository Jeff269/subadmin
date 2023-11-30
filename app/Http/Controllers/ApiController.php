<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use Microsoft\Graph\GraphServiceClient;
use App\TokenStore\TokenCache;
use Exception;
use Microsoft\Graph\Model\PhoneAuthenticationMethod;

class ApiController extends Controller
{
    public function consulta($email){
        $viewData = $this->loadViewData();
        $graph = $this->getGraph();
        $getEventsUrl = '/users/'.$email;
        try{
            $events = $graph
                ->createRequest('GET',$getEventsUrl)
                ->setReturnType(Model\User::class)
                ->execute();
            $viewData['users'] = $events;
            return($events);
        }catch(Exception $e){
            if($e->getMessage() == 'No access token has been provided.'){
                return redirect('signin');
            }else{
                return $e;
            }
        }
    }

    public function reset($email){

        $viewData = $this->loadViewData();
        $graph = $this->getGraph();
        $getEventsUrl = '/users/'.$email.'/authentication/methods/28c10230-6103-485e-b985-444c60001490/resetPassword';

        try{
            $events = $graph
                ->createRequest('POST',$getEventsUrl)
                ->setReturnType(Model\User::class)
                ->execute();
            $viewData['users'] = $events;
            return($events);
        }catch(Exception $e){
            if($e->getMessage() == 'No access token has been provided.'){
                return redirect('signin');
            }else{
                return $e;
            }
        }
    }

    public function updateNumber($email,$number){

        $viewData = $this->loadViewData();
        $graph = $this->getGraph();
        $getEventsUrl = '/users/'.$email.'/authentication/phoneMethods/3179e48a-750b-4051-897c-87b9720928f7';

        $requestBody = new PhoneAuthenticationMethod();
        $requestBody->setPhoneNumber('+51 '.$number);
        $requestBody->setPhoneType('mobile');

        try{
            $events = $graph
                ->createRequest('PATCH',$getEventsUrl)
                ->setReturnType(Model\User::class)
                ->execute();
            $viewData['users'] = $events;
            return($events);
        }catch(Exception $e){
            if($e->getMessage() == 'No access token has been provided.'){
                return redirect('signin');
            }else{
                return $e;
            }
        }
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

    private function getGraphService(): GraphServiceClient
    {
        $tokenCache = new TokenCache();
        $accessToken = $tokenCache->getAccessToken();

        $graphService = new GraphServiceClient();
    }
}
