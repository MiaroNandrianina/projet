<?php

namespace App\Controller;

use App\Entity\Modeles;
use App\Form\ModelesType;
use App\Repository\ModelesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/modeles')]
final class ModelesController extends AbstractController
{
    #[Route(name: 'app_modeles_index', methods: ['GET'])]
    public function index(ModelesRepository $modelesRepository): Response
    {
        return $this->render('modeles/index.html.twig', [
            'modeles' => $modelesRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_modeles_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $modele = new Modeles();
        $form = $this->createForm(ModelesType::class, $modele);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $saryfile */
            $saryfile = $form->get('image_Url')->getData();

            if ($saryfile) {
                $sary = uniqid().'.'.$saryfile->guessExtension();
                
                try {
                    $saryfile->move($this->getParameter('kernel.project_dir') . '/public/uploads/images', $sary);
                } catch (FileException $e) {
                
                }
                $modele->setImageUrl($sary);
            }

            $entityManager->persist($modele);
            $entityManager->flush();
            return $this->redirectToRoute('app_modeles_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('modeles/new.html.twig', [
            'modele' => $modele,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_modeles_show', methods: ['GET'])]
    public function show(Modeles $modele): Response
    {
        return $this->render('modeles/show.html.twig', [
            'modele' => $modele,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_modeles_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Modeles $modele, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ModelesType::class, $modele);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
           /** @var UploadedFile $saryfile */
           $saryfile = $form->get('image_Url')->getData();

           if ($saryfile) {
            $sary=uniqid().'.'.$saryfile->guessExtension();
            
            try {
                $saryfile->move($this->getParameter('kernel.project_dir') . '/public/uploads/images', $sary);
            } catch (FileException $e) {
                
            }
           }

            $entityManager->flush();

            return $this->redirectToRoute('app_modeles_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('modeles/edit.html.twig', [
            'modele' => $modele,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_modeles_delete', methods: ['POST'])]
    public function delete(Request $request, Modeles $modele, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$modele->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($modele);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_modeles_index', [], Response::HTTP_SEE_OTHER);
    }
}
