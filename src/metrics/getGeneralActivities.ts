import type { FireInspectionData } from "../interfaces/fireInspection";

interface GeneralActivities {
  doneActivitiesCount: number;
  pendingActivitiesCount: number;
}

export function getGeneralActivities(
  data: FireInspectionData
): GeneralActivities {
  const counts = data.clientes.reduce(
    (acc, cliente) => {
      cliente.areas.forEach((area) => {
        area.equipamentos.forEach((equipamento) => {
          if (equipamento.atividade.status === "concluida") {
            acc.doneActivitiesCount++;
          }
          if (equipamento.atividade.status === "pendente") {
            acc.pendingActivitiesCount++;
          }
        });
      });
      return acc;
    },
    { doneActivitiesCount: 0, pendingActivitiesCount: 0 }
  );

  return counts;
}

interface UrgentPendingActivity {
  clientName: string;
  equipmentName: string;
  alert: string;
  dueDate: string;
}

export function getUrgentPendingActivities(
  data: FireInspectionData
): UrgentPendingActivity[] {
  return data.clientes.flatMap((cliente) =>
    cliente.areas.flatMap((area) =>
      area.equipamentos
        .filter(
          (equipamento) =>
            equipamento.atividade.status === "pendente" &&
            equipamento.atividade.alerta !== null
        )
        .map((equipamento) => ({
          clientName: cliente.nome,
          equipmentName: equipamento.nome,
          alert: equipamento.atividade.alerta as string,
          dueDate: equipamento.atividade.data_proxima_inspecao || "",
        }))
    )
  );
}

interface NextActivity {
  clientName: string;
  equipmentName: string;
  dueDate: string;
}

export function getNextActivities(data: FireInspectionData): NextActivity[] {
  const now = new Date();

  const fifteenDaysFromNow = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);

  const activities = data.clientes.flatMap((cliente) =>
    cliente.areas.flatMap((area) =>
      area.equipamentos
        .filter((equipamento) => {
          if (!equipamento.atividade.data_proxima_inspecao) return false;

          const dueDate = new Date(equipamento.atividade.data_proxima_inspecao);
          return dueDate >= now && dueDate <= fifteenDaysFromNow;
        })
        .map((equipamento) => ({
          clientName: cliente.nome,
          equipmentName: equipamento.nome,
          dueDate: equipamento.atividade.data_proxima_inspecao || "",
        }))
    )
  );

  return activities.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}

// A next improuvement could be add more data to the returns of the functions above
