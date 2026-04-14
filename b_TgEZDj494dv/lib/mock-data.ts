export interface PaymentOrder {
  id: number
  type: string
  dateEmission: string
  sourceOP: string
  modePaie: string
  montant: number
  etat: string
  periodeEmission: string
  beneficiaire: string
  refStructure: string
  numeroAffilie: string
}

export interface HistoriqueItem {
  numero: string
  date: string
  motif: string
  libelleMotif: string
  situation: string
  libelleSituation: string
  utilisateurAgence: string
}

export const paymentOrders: PaymentOrder[] = [
  {
    id: 1,
    type: "OP",
    dateEmission: "15/03/2021",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 245.00,
    etat: "Genere",
    periodeEmission: "03/2021",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-001",
    numeroAffilie: "118059982"
  },
  {
    id: 2,
    type: "OP",
    dateEmission: "22/05/2021",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 499.80,
    etat: "Genere",
    periodeEmission: "05/2021",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-002",
    numeroAffilie: "118059982"
  },
  {
    id: 3,
    type: "OP",
    dateEmission: "10/08/2021",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 5250.00,
    etat: "Genere apres deblocage",
    periodeEmission: "08/2021",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-003",
    numeroAffilie: "118059982"
  },
  {
    id: 4,
    type: "OP",
    dateEmission: "03/11/2021",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 1230.50,
    etat: "Genere",
    periodeEmission: "11/2021",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-004",
    numeroAffilie: "118059982"
  },
  {
    id: 5,
    type: "OP",
    dateEmission: "18/01/2022",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 875.25,
    etat: "Genere",
    periodeEmission: "01/2022",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-005",
    numeroAffilie: "118059982"
  },
  {
    id: 6,
    type: "OP",
    dateEmission: "25/03/2022",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 320.00,
    etat: "Genere apres deblocage",
    periodeEmission: "03/2022",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-006",
    numeroAffilie: "118059982"
  },
  {
    id: 7,
    type: "OP",
    dateEmission: "12/06/2022",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 1580.75,
    etat: "Genere",
    periodeEmission: "06/2022",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-007",
    numeroAffilie: "118059982"
  },
  {
    id: 8,
    type: "OP",
    dateEmission: "08/09/2022",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 445.60,
    etat: "Genere",
    periodeEmission: "09/2022",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-008",
    numeroAffilie: "118059982"
  },
  {
    id: 9,
    type: "OP",
    dateEmission: "30/11/2022",
    sourceOP: "CNSS",
    modePaie: "Virement",
    montant: 2150.00,
    etat: "Genere",
    periodeEmission: "11/2022",
    beneficiaire: "BAHRAOUY ETTADRARTY",
    refStructure: "RBT-009",
    numeroAffilie: "118059982"
  }
]

export const historiqueData: HistoriqueItem[] = [
  {
    numero: "H001",
    date: "15/03/2021",
    motif: "CRE",
    libelleMotif: "Création",
    situation: "VAL",
    libelleSituation: "Validé",
    utilisateurAgence: "AGT_RBT_001"
  },
  {
    numero: "H002",
    date: "16/03/2021",
    motif: "TRT",
    libelleMotif: "Traitement",
    situation: "ENV",
    libelleSituation: "Envoyé",
    utilisateurAgence: "AGT_RBT_002"
  },
  {
    numero: "H003",
    date: "18/03/2021",
    motif: "PAI",
    libelleMotif: "Paiement",
    situation: "GEN",
    libelleSituation: "Généré",
    utilisateurAgence: "AGT_RBT_001"
  }
]
