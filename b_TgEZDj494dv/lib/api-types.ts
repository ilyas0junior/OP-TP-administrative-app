export type PaymentOrder = {
  id: number;
  type: string;
  dateEmission: string;
  sourceOP: string;
  modePaie: string;
  montant: number;
  etat: string;
  periodeEmission: string;
  beneficiaire: string;
  refStructure: string;
  numeroAffilie: string;
};

export type HistoriqueItem = {
  numero: string;
  date: string;
  motif: string;
  libelleMotif: string;
  situation: string;
  libelleSituation: string;
  utilisateurAgence: string;
};

export type PaymentOrdersResponse = {
  orders: PaymentOrder[];
};

