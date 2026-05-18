<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class MessageController extends AbstractController
{
    #[Route('/message', name: 'app_message')]
    public function Message(ContactRepository $contactRepository): Response
    {
        return $this->render('message/index.html.twig', [
            'messages' => $contactRepository->findBy([], ['created_at' => 'DESC']),
        ]);
    }
    #[Route('/message/delete/{id}', name: 'app_message_delete', methods: ['POST', 'GET'])]
    public function delete(Contact $contact, EntityManagerInterface $em): Response
    {
        
        $em->remove($contact);
        $em->flush();

        $this->addFlash('success', 'message envoyer!');
        return $this->redirectToRoute('app_message');
    }
}
