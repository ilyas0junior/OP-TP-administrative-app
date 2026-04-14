-- This file is intentionally a copy of database/database.sql so Oracle XE
-- can auto-run it on container initialization.

CREATE TABLE CNSS.D_ASS_OPERATION
(
  ASO_C_NUMERO     NUMBER(15)                   NOT NULL,
  MPA_C_MPAI       VARCHAR2(1 BYTE)             NOT NULL,
  TPR_C_PREST      VARCHAR2(2 BYTE)             NOT NULL,
  IMM_V_NUM_IMM    VARCHAR2(9 BYTE)             NOT NULL,
  ASO_N_DOSSIER    VARCHAR2(15 BYTE),
  ASO_D_MAJ        DATE                         NOT NULL,
  AEO_N_EVOP       NUMBER(15),
  ASO_D_VAL        DATE,
  ASO_D_EMISS      DATE                         NOT NULL,
  ASO_P_EMISS      NUMBER(6)                    NOT NULL,
  ASO_M_MVT        NUMBER(14,2)                 NOT NULL,
  ASO_L_REFST      VARCHAR2(15 BYTE),
  ASO_D_DEB_PAI    DATE,
  ASO_C_ETAT       NUMBER(2)                    NOT NULL,
  ASO_C_NUMERO_A   NUMBER(15),
  TEV_C_EVOP       NUMBER(4),
  ASO_D_OPER       DATE,
  ASO_C_OPBQ       VARCHAR2(4 BYTE),
  ASO_M_MVT_DEV    NUMBER(14,2),
  ASO_L_REF        VARCHAR2(10 BYTE),
  ASO_V_NOMBRE     NUMBER(3),
  ASO_C_REF_IND    VARCHAR2(12 BYTE),
  ASO_D_CRE        DATE                         NOT NULL,
  ASO_V_NUM_AFF    VARCHAR2(7 BYTE),
  ASO_L_REFTP      VARCHAR2(15 BYTE),
  AFO_N_AFF_OPE    NUMBER(15),
  PAY_C_CODE       VARCHAR2(4 BYTE),
  ASO_NPR_C_PREST  VARCHAR2(2 BYTE)
  )
 ;
ALTER TABLE CNSS.D_ASS_OPERATION ADD (
    CONSTRAINT ASO_PK
  PRIMARY KEY
  (ASO_C_NUMERO)
);

CREATE TABLE CNSS.P_SIT_EVDEC
(
  SEV_C_EVEN         NUMBER(15)                 NOT NULL,
  SEV_N_EVEN         NUMBER(10)                 NOT NULL,
  SEV_D_EVEN         DATE                       NOT NULL,
  MTE_C_MOTIF        NUMBER(3),
  TSI_C_TSI          NUMBER(4)                  NOT NULL,
  NGE_NGE_C_NAT_GES  NUMBER(2)                  DEFAULT 1,
  SEV_C_UTIL         VARCHAR2(5 BYTE),
  SEV_C_DELEG        VARCHAR2(2 BYTE)
);

CREATE TABLE CNSS.D_INDIVIDU
(
  IND_V_NUM_INDIVIDU              VARCHAR2(12 BYTE) NOT NULL,
  IND_V_CIN                       VARCHAR2(8 BYTE),
  IND_L_NOM                       VARCHAR2(30 BYTE),
  IND_L_PRENOM                    VARCHAR2(30 BYTE),
  IND_D_NAISSANCE                 DATE          NOT NULL,
  IND_C_DATEPRESUME               VARCHAR2(1 BYTE),
  IND_C_SEXE                      VARCHAR2(1 BYTE) DEFAULT 'M' NOT NULL,
  IND_C_ETAT_MAT                  VARCHAR2(1 BYTE) DEFAULT 'C',
  IND_D_ETAT_MAT                  DATE,
  IND_L_NOM_PERE                  VARCHAR2(40 BYTE),
  IND_L_NOM_MERE                  VARCHAR2(40 BYTE),
  IND_L_ADRESSE                   VARCHAR2(120 BYTE),
  IND_C_POSTAL                    VARCHAR2(5 BYTE),
  IND_V_TEL                       VARCHAR2(40 BYTE),
  IND_V_FAX                       VARCHAR2(40 BYTE),
  IND_C_SUSP_AF                   VARCHAR2(1 BYTE),
  IND_C_CATEGORIE                 VARCHAR2(1 BYTE),
  IND_D_INVALIDITE                DATE,
  IND_D_DECES                     DATE,
  IND_C_CAUSE_DECES               VARCHAR2(1 BYTE),
  IND_V_NOM_ABREGE                VARCHAR2(20 BYTE),
  IND_C_STATUT_REC                VARCHAR2(1 BYTE),
  IND_L_OBSERVATION               VARCHAR2(200 BYTE),
  COM_CMM_C_COMMUNE               VARCHAR2(2 BYTE),
  COM_CER_CRC_C_CERCLE            VARCHAR2(2 BYTE),
  COM_CER_PRO_PRV_C_PROVINCE      VARCHAR2(3 BYTE),
  PAY_PAY_C_CODE                  VARCHAR2(4 BYTE),
  PAY_PAY_C_CODE_A_POUR_NATIONAL  VARCHAR2(4 BYTE),
  VIL_VLL_C_VILLE                 VARCHAR2(3 BYTE),
  IND_V_SEJ                       VARCHAR2(10 BYTE),
  IND_V_PASS                      VARCHAR2(40 BYTE),
  IND_V_CNE                       VARCHAR2(10 BYTE),
  IND_V_ETAT_CIVIL                VARCHAR2(15 BYTE),
  IND_L_LIEU_NAISS                VARCHAR2(120 BYTE)
 );

CREATE TABLE CNSS.D_IMMATRICULE
(
  IMM_V_NUM_IMM                   VARCHAR2(9 BYTE) NOT NULL,
  IMM_D_IMM                       DATE          NOT NULL,
  IMM_C_QUALITE                   VARCHAR2(1 BYTE),
  IMM_N_NBR_JOURS                 NUMBER(7,2),
  IMM_N_NBR_JOURS_MINE            NUMBER(7,2),
  IMM_D_DER_DS                    DATE,
  IMM_D_DER_BDS                   DATE,
  IMM_D_DER_ASVI                  DATE,
  IMM_D_COND_STAGE                DATE,
  IMM_C_ORIGINE                   VARCHAR2(1 BYTE) DEFAULT 'A',
  IMM_C_STATUT_REC                VARCHAR2(1 BYTE),
  IMM_C_SALAIRE_AN                VARCHAR2(1 BYTE),
  IMM_C_MODE_PAIEMENT             VARCHAR2(1 BYTE),
  IMM_D_DEBUT_PERIODE             DATE,
  IMM_D_DEBUT_PERIODE_PREC        DATE,
  IMM_N_NBR_JOURS_IJM             NUMBER(7,2),
  IMM_N_NBR_JOURS_IJM_PREC        NUMBER(7,2),
  IMM_M_TROP_PERCU_AF             NUMBER(11,2),
  IMM_M_TROP_PERCU_IJM            NUMBER(11,2),
  IMM_D_DER_BDS_ASVI              DATE,
  AFF_AFF_V_NUM_AFF               VARCHAR2(7 BYTE),
  AFF_AFF_V_NUM_AFF_DECLARE_EN_D  VARCHAR2(7 BYTE),
  DEL_DLG_C_DELEG                 VARCHAR2(2 BYTE) NOT NULL,
  IND_IND_V_NUM_INDIVIDU          VARCHAR2(12 BYTE) NOT NULL,
  IMM_IMM_V_NUM_IMM               VARCHAR2(9 BYTE),
  IMM_D_SAISIE                    DATE,
  IMM_V_UT_SAISIE                 VARCHAR2(5 BYTE)
  );
ALTER TABLE CNSS.D_IMMATRICULE ADD (
  CONSTRAINT IMM_PK
  PRIMARY KEY
  (IMM_V_NUM_IMM)
);

CREATE TABLE CNSS.APP_USERS
(
  USERNAME   VARCHAR2(50 BYTE) NOT NULL,
  PASSWORD   VARCHAR2(200 BYTE) NOT NULL,
  CREATED_AT DATE DEFAULT SYSDATE NOT NULL
);
ALTER TABLE CNSS.APP_USERS ADD (
  CONSTRAINT APP_USERS_PK PRIMARY KEY (USERNAME)
);

