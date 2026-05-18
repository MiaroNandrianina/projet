<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\CommandeItems;
use App\Repository\CommandeRepository;
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
            return new JsonResponse(['error' => 'bessoin de se connecter'], 401);
        };
        $data = json_decode($request->getContent(), true);
        $cart = $data['panier']; 
        if (empty($cart)) {
            return new JsonResponse(['error' => 'Panier vide'], 400);
        }
        //  MAMORONA NY COMMANDE //
        $commande = new Commande();
        $commande->setUser($user);
        $commande->setCreatedAt(new \DateTimeImmutable());
        $commande->setStatus('En attente');

        $total=0;

        
        foreach ($cart as $item) {
            $modele = $modelesRepository->find($item['id']);
            if ($modele) {
                $ligne = new CommandeItems();
                $ligne->setModele($modele);
                $ligne->setCommande($commande);
                $ligne->setQuantite($item['qte']);
                $ligne->setPrix($modele->getPrix());

    
                $total += ($modele->getPrix() * $item['qte']);

                $modele->setStock($modele->getStock() - $item['qte']);

                $em->persist($ligne);
            }
        }

        $commande->setTotal($total);
        $em->persist($commande);
        $em->flush();
        return new JsonResponse(['message' => 'Commande recu! No. ' . $commande->getId()], 201);
    }

    #[Route('/api/commande/{id}', name: 'app_commande_detail', methods:['GET'])]
    public function detail(int $id, CommandeRepository $commandeRepo): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Connecter vous si possible'], 401);
        }

        $commande = $commandeRepo->find($id);

        if (!$commande || $commande->getUser() !== $user) {
            return $this->json(['error' => 'Commande introuvable'], 404);
        }

        $itemsData = [];
        
        $items = method_exists($commande, 'getCommandeItems') ? $commande->getCommandeItems() : [];

        foreach ($items as $item) {
            $modele = $item->getModele(); 
            
            $itemsData[] = [
                'id' => $item->getId(),
                'telephone' => $modele ? (method_exists($modele, 'getNom') ? $modele->getNom() : 'Finday') : 'Produit inconnu', 
                'quantite' => $item->getQuantite(),
                'prixUnitaire' => (float) $item->getPrix(), 
                'sousTotal' => (float) ($item->getQuantite() * $item->getPrix())
            ];
        }

        $dateFormated = $commande->getCreatedAt() ? $commande->getCreatedAt()->format('c') : date('c');

        return $this->json([
            'id' => $commande->getId(),
            'date' => $dateFormated,
            'total' => (float) $commande->getTotal(),
            'status' => $commande->getStatus() ?? 'En attente',
            'items' => $itemsData
        ]);
    }
}
