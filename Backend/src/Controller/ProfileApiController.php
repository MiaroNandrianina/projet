<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class ProfileApiController extends AbstractController
{
    #[Route('/api/profile/update', name: 'app_profile_api_update', methods: ['PUT'])]
    public function update(Request $request, EntityManagerInterface $em): JsonResponse
    {
        //  Alaina ny User connecte
        /** @var User $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'Tsy connecte ianao!'], 401);
        }

        //  Alaina ny data avy amin'ny React
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['message' => 'Tsy misy data voaray!'], 400);
        }

        if (isset($data['nom'])) {
            $user->setNom($data['nom']);
        }
        
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        if (isset($data['telephone'])) {
            $user->setTelephone($data['telephone']);
        }

        if (isset($data['adresse'])) {
            $user->setAdresse($data['adresse']);
        }

        try {
            $em->flush();
            return $this->json([
                'status' => 'success',
                'message' => 'nouveau profile!',
                'user' => [
                    'nom' => $user->getNom(),
                    'email' => $user->getEmail(),
                    'telephone' => $user->getTelephone(),
                    'adresse' => $user->getAdresse()
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json(['message' => 'erreur: ' . $e->getMessage()], 500);
        }
    }
}
