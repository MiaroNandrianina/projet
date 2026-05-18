<?php

namespace App\Controller;

use App\Repository\CommandeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class StatApiController extends AbstractController
{
    #[Route('/api/stat', name: 'app_stat_api', methods:['GET'])]
    public function Stats(CommandeRepository $commandeRepo): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'pas connecter'], 401);
        }
        
        $commandes = $commandeRepo->findBy(['user' => $user]);

        $totalCommandes = count($commandes);
        $totalDepense = 0;
        $listesCommandes = []; 

        foreach ($commandes as $cmd) {
            $totalDepense += (float) $cmd->getTotal(); 
            
            $dateFormated = date('c'); 
            if (method_exists($cmd, 'getCreatedAt') && $cmd->getCreatedAt() !== null) {
                $dateFormated = $cmd->getCreatedAt()->format('c');
            } elseif (method_exists($cmd, 'getDateCommande') && $cmd->getDateCommande() !== null) {
                $dateFormated = $cmd->getDateCommande()->format('c');
            }

            $statusValue = 'En attente';
            if (method_exists($cmd, 'getStatus')) {
                $statusValue = $cmd->getStatus() ?? 'En attente';
            } elseif (method_exists($cmd, 'getStatut')) {
                $statusValue = $cmd->getStatut() ?? 'En attente';
            }
            
            $listesCommandes[] = [
                'id' => $cmd->getId(),
                'createdAt' => $dateFormated, 
                'total' => (float) $cmd->getTotal(),
                'status' => $statusValue
            ];
        }
        
        return $this->json([
            'totalCommandes' => $totalCommandes,
            'totalDepense' => $totalDepense,
            'commandes' => $listesCommandes, 
        ]);
    }
}