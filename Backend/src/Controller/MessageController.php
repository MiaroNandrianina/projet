<?php

namespace App\Controller;

use App\Repository\ContactRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class MessageController extends AbstractController
{
    #[Route('/message', name: 'app_message')]
    public function Message(ContactRepository $contactRepository): Response
    {
        return $this->render('message/index.html.twig', [
            'messages' => $contactRepository->findBy([], ['created_at'=> 'DESC']),
        ]);
    }
}
