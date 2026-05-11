<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\CommandeItems;
use App\Repository\ModelesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CommandeApiController extends AbstractController
{
    #[Route('/api/commande', name: 'app_commande_api', methods:['POST'])]
    public function index(Request $request, EntityManagerInterface $em, ModelesRepository $modelesRepository): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Mila manao login ianao'], 401);
        };
        $data = json_decode($request->getContent(), true);
        $cart = $data['panier']; // Lisitry ny entana avy amin'ny React
        if (empty($cart)) {
            return new JsonResponse(['error' => 'Foana ny haronao'], 400);
        }
        // --- 1. MAMORONA NY COMMANDE ALOHA (Ity ilay adino!) ---
        $commande = new Commande();
        $commande->setUser($user);
        $commande->setCreatedAt(new \DateTimeImmutable());
        $commande->setStatus('En attente');

        $total=0;

        // 3. Mamorona ny LigneCommande tsirairay
        foreach ($cart as $item) {
            $modele = $modelesRepository->find($item['id']);
            if ($modele) {
                $ligne = new CommandeItems();
                $ligne->setModele($modele);
                $ligne->setCommande($commande);
                $ligne->setQuantite($item['qte']);
                $ligne->setPrix($modele->getPrix());

                // Kajy ny total
                $total += ($modele->getPrix() * $item['qte']);

                // (Bonus) Mampihena ny stock
                $modele->setStock($modele->getStock() - $item['qte']);

                $em->persist($ligne);
            }
        }

        $commande->setTotal($total);
        $em->persist($commande);
        $em->flush();
        return new JsonResponse(['message' => 'Commande voaray! No. ' . $commande->getId()], 201);
    }
}
