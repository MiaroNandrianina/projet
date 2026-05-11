<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ContactApiController extends AbstractController
{
    #[Route('/contact/api', name: 'app_contact_api', methods:['POST'])]
    public function index(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['nom']) || empty($data['email']) || empty($data['sujet']) || empty(['message']) ) {
            return $this -> json(['message'=>'mila fenoina champ rehetra'], 400);
        }

        $contact = new Contact();
        $contact ->setNom($data['nom']);
        $contact->setEmail($data['email']);
        $contact->setSujet($data['sujet']);
        $contact->setMessage($data['message']);
        $contact->setCreatedAt(new \DateTimeImmutable());

        $em->persist($contact);
        $em->flush();
        return $this ->json(['message' =>'tafiditra ny resakao'], 201);
    }
}
