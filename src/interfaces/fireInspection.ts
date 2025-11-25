// Types generated from src/fire_inspection_mock.json

export type AtividadeStatus = "concluida" | "pendente" | string;

export interface Atividade {
  data: string | null;
  descricao: string;
  data_inicio: string | null;
  data_finalizacao: string | null;
  status: AtividadeStatus;
  data_proxima_inspecao: string | null;
  alerta: string | null;
}

export interface Equipamento {
  nome: string;
  tipo: string;
  atividade: Atividade;
}

export interface Area {
  nome: string;
  latitude: number;
  longitude: number;
  equipamentos: Equipamento[];
}

export interface Cliente {
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  areas: Area[];
}

export interface FireInspectionData {
  gerado_em: string;
  clientes: Cliente[];
}
