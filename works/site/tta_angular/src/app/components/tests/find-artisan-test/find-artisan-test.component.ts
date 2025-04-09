import { Component } from '@angular/core';

@Component({
  selector: 'app-find-artisan-test',
  standalone: false,
  templateUrl: './find-artisan-test.component.html',
  styleUrl: './find-artisan-test.component.scss'
})
export class FindArtisanTestComponent {
  // Liste des étapes avec explications détaillées
  steps = [
    {
      number: 1,
      title: 'Choisir une catégorie',
      text: 'Choisissez une catégorie d’artisanat dans le menu afin de voir les artisans disponibles.',
      details: 'Vous pouvez accéder aux catégories principales comme Bâtiment, Services, ou Alimentation. Chaque catégorie regroupe des artisans spécialisés.',
    },
    {
      number: 2,
      title: 'Sélectionner un artisan',
      text: 'Consultez la liste d’artisans de la catégorie sélectionnée et choisissez celui qui vous intéresse.',
      details: 'Chaque artisan dispose d’une fiche détaillée avec des informations sur ses compétences, sa localisation, et ses évaluations.',
    },
    {
      number: 3,
      title: 'Contacter l’artisan',
      text: 'Utilisez le formulaire de contact pour envoyer votre demande directement à l’artisan choisi.',
      details: 'Remplissez le formulaire avec vos informations et détails concernant votre besoin. L’artisan recevra immédiatement votre demande.',
    },
    {
      number: 4,
      title: 'Recevoir une réponse',
      text: 'Recevez une réponse sous 48 heures pour finaliser les échanges avec l’artisan.',
      details: 'L’artisan s’engage à répondre rapidement pour discuter des modalités et convenir d’un rendez-vous si nécessaire.',
    },
  ];
}
