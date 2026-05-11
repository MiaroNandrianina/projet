<?php

namespace App\Controller;

use App\Repository\MarqueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class MarqueApiController extends AbstractController
{
    #[Route('/api/marque', name: 'app_api_marque_list', methods: ['GET'])]
    public function index(MarqueRepository $marqueRepository): JsonResponse
    {
        $marques = $marqueRepository->findAll();
        $data = [];

        foreach ($marques as $marque) {
            $data[] = [
                'id' => $marque->getId(),
                'nom' => $marque->getNom(),
            ];
        }

        return new JsonResponse($data);
    }
}