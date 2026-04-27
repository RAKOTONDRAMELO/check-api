export enum UserRole {
  ADMIN = 'ADMIN',
  FLEETMANAGEMENT = 'FLEETMANAGEMENT',
  TECHNICIAN = 'TECHNICIAN',
  DRIVER = 'DRIVER',
}
export const UserRoleInfo = {
  [UserRole.ADMIN]: {
    label: 'Administrateur',
    description: 'Utilisateur qui gere les comptes des autres utilisateurs',
  },

  [UserRole.FLEETMANAGEMENT]: {
    label: 'Gestionnaire de flotte',
    description: "Utilisateur qui possede l'acces a tous les vehicules",
  },

  [UserRole.TECHNICIAN]: {
    label: 'Technicien',
    description:
      "Utilisateur qui possede l'acces a tous les fiches techniques des vehicules",
  },

  [UserRole.DRIVER]: {
    label: 'Chauffeur',
    description:
      "Conducteur de véhicule, il peut acceder aux vehicules qu'on l'a assigne",
  },
};

export enum UserStatus {
  AFFECT = 'AFFECT',
  VACATION = 'VACATION',
  ACTIVE = 'ACTIVE',
}
export const UserStatusInfo = {
  [UserStatus.AFFECT]: {
    label: 'Affecter',
    description: 'Cette personne est envoye en mission',
  },

  [UserStatus.VACATION]: {
    label: 'En vacances',
    description: 'Cette personne est en conge',
  },

  [UserStatus.ACTIVE]: {
    label: 'active',
    description: 'Cette personne est disponible en ce momemt',
  },
};
