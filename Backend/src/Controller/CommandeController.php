<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Repository\CommandeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CommandeController extends AbstractController
{
    #[Route('/commande', name: 'app_commande')]
    public function index(CommandeRepository $commandeRepository): Response
    {
       return $this->render('commande/index.html.twig', [
            'commandes' => $commandeRepository->findBy([], ['created_at' => 'DESC']),
        ]);
    }
    
    #[Route('/{id}/valider', name: 'app_commande_valider', methods: ['POST'])]
    public function valider(Commande $commande, EntityManagerInterface $em): Response
    {
        // Ovaina ny status (atao hoe 'Validé' na 1 miankina amin'ny karazany ao amin'ny DB)
        $commande->setStatus('Validé'); 
        $em->flush();

        $this->addFlash('success', 'Kaomandy laharana #' . $commande->getId() . 'compte verifié!');

        return $this->redirectToRoute('app_commande');
    }
}
