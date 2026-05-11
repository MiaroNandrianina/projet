<?php

namespace App\Controller;

use App\Repository\ModelesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ModeleApiController extends AbstractController
{
    #[Route('/api/modeles', name: 'app_api_modeles_list', methods: ['GET'])]
    public function index(ModelesRepository $modelesRepository): JsonResponse
    {
        $modeles = $modelesRepository->findAll();
        $data = [];

        foreach ($modeles as $modele) {
            $baseUrl = "http://localhost:8000/uploads/images/";
            $data[] = [
                'id' => $modele->getId(),
                'nom' => $modele->getNom(),
                'prix'=>$modele->getPrix(),
                'imageUrl' => $modele->getImageUrl() ? $baseUrl . $modele->getImageUrl() : null,
                'stock'=>$modele->getStock(),
                'marque'=> [
                    'id'=> $modele->getMarque()->getId(),
                    'nom'=> $modele->getMarque()->getNom(),
                ],
                'details'=>$modele->getDetails(),
            ];
        }

        return new JsonResponse($data);
    }
}