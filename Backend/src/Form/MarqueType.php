<?php

namespace App\Form;

use App\Entity\Marque;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MarqueType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', TextType::class, [
                'label'=>'nom',
                'attr'=>[
                    'placeholder'=>'marques',
                    'class'=>'p-4 input form-control border border-2 border-dark mb-4 w-full',
                    'style'=>'border: 2px solid #000 !important;'
                ],
                'label_attr'=>[
                    'class'=> 'label text-white font-bold text-2xl'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Marque::class,
        ]);
    }
}
