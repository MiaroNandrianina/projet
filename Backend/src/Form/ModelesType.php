<?php

namespace App\Form;

use App\Entity\Marque;
use App\Entity\Modeles;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class ModelesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', TextType::class, [
                'label' => 'nom',
                'attr' => [
                    'placeholder' => 'modele',
                    'class' => 'p-4 input form-control border border-2 border-dark mb-4 w-full',
                    'style' => 'border: 2px solid #000 !important;'
                ],
                'label_attr' => [
                    'class' => 'label text-white font-bold text-2xl'
                ]
            ])
            ->add('prix', NumberType::class, [
                'label' => 'prix',
                'attr' => [
                    'placeholder' => '1000.10',
                    'class' => 'p-4 input form-control border border-2 border-dark mb-4 w-full',
                    'style' => 'border: 2px solid #000 !important;',
                    'step' => '0.01',
                ],
                'label_attr' => [
                    'class' => 'label text-white font-bold text-2xl'
                ],
            ])
            ->add('image_Url', FileType::class, [
                'label' => 'sary',
                'mapped' => false,
                'required' => false,
                'attr' => [
                    'placeholder' => 'hampiditra sary',
                    'class' => 'form-control input mb-4 border border-2 border-dark mb-4 w-full',
                    'style' => 'border: 2px solid #ec8e01 !important;'
                ],
                'label_attr' => [
                    'class' => 'label text-white font-bold text-2xl'
                ],
                'constraints' => [
                    new File([
                        'maxSize' => '2M',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                            'image/webp',
                        ],
                        'mimeTypesMessage' => 'Mba ampidiro sary manan-kery (JPG, PNG, WEBP)',
                    ])
                ]
            ])
            ->add('stock', IntegerType::class, [
                'label' => 'quantite',
                'attr' => [
                    'placeholder' => '1',
                    'class' => 'form-control input mb-4 border border-2 border-dark mb-4 w-full',
                    'style' => 'border: 2px solid #ec8e01 !important;',
                    'min' => '0'
                ],
                'label_attr' => [
                    'class' => 'label text-white font-bold text-2xl'
                ],
            ])
           ->add('details', TextareaType::class,[
                'label'=>'detail',
                'attr'=>[
                    'placeholder'=>'details',
                    'class'=>'form-control input mb-4 border border-2 border-dark mb-4 w-full',
                    'style'=>'border: 2px solid #ec8e01 !important;'
                ],
                'label_attr'=>[
                    'class'=>'label text-white font-bold text-2xl'
                ]
            ])
            ->add('marque', EntityType::class, [
                'class' => Marque::class,
                'choice_label' => 'id',
                'label_attr' => [
                    'class' => 'label text-white font-bold text-2xl'
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Modeles::class,
        ]);
    }
}
