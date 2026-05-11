<?php

namespace App\Controller;

use App\Repository\CommandeRepository;
use App\Repository\MarqueRepository;
use App\Repository\ModelesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DashboardController extends AbstractController
{
    #[Route('/', name: 'app_dashboard')]
    public function index(ModelesRepository $modelesRepository, MarqueRepository $marquesRepository, CommandeRepository $commandeRepository): Response
    {  
       $totalModeles = $modelesRepository->count([]);
       $totalMarques = $marquesRepository->count([]);
       $totalCommandes = $commandeRepository->count([]);
       return $this->render('dashboard/index.html.twig', [
          'totalModeles' => $totalModeles,
          'totalMarques'=> $totalMarques,
          'totalCommandes'=> $totalCommandes
       ]);
    }
}
