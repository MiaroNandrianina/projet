<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class ApiRegistrationController extends AbstractController
{
    #[Route('/api/registration', name: 'app_api_registration', methods: ['POST'])]
    public function registration(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $em, UserRepository $userRepository): JsonResponse
    {

        $data = json_decode($request->getContent(), true);

        // ...................fanamarinana raha feno ny data........................................//
        if (!isset($data['email']) || !isset($data['password']) || !isset($data['nom'])) {
            return $this->json(['message' => 'Mila fenoina ny nom, email, ary password!'], 400);
        }

        $existingUser = $userRepository->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return $this->json(['message' => 'Efa ampiasaina io email io!'], 400);
        }

        $user = new User();
        $user->setNom($data['nom']);
        $user->setEmail($data['email']);
        $user->setRoles(['ROLE_USER']);
        // ..........................hasher password................................................//
        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $user->setCreatedAt(new \DateTimeImmutable());
        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'Kaonty voatomboka soa aman-tsara!'], 201);
    }
}
