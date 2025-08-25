import { Component } from '@angular/core';

interface SolicitacaoManutencao {
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: 'ABERTA' | 'ORCAMENTO' | 'CONCLUIDA';
}

@Component({
  selector: 'app-solicitacao-manutencao',
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      
      <!-- Cabeçalho -->
      <div class="w-full max-w-2xl">
        <button class="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          ← Voltar
        </button>
        <h1 class="text-2xl font-bold text-gray-800">Nova Solicitação</h1>
        <p class="text-gray-500">Descreva seu equipamento e o problema encontrado</p>
      </div>

      <!-- Card do formulário -->
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Dados da Solicitação</h2>
        <p class="text-sm text-gray-500 mb-6">Preencha todos os campos para criar sua solicitação de manutenção</p>

        <form (ngSubmit)="registrarSolicitacao()" #formSolicitacao="ngForm" class="space-y-5">
          
          <!-- Descrição do equipamento -->
          <div>
            <label for="descricaoEquipamento" class="block text-sm font-medium text-gray-700">
              Descrição do equipamento
            </label>
            <input
              id="descricaoEquipamento"
              name="descricaoEquipamento"
              type="text"
              maxlength="100"
              [(ngModel)]="novaSolicitacao.descricaoEquipamento"
              required
              placeholder="Ex: Notebook Dell Inspiron 15, TV Samsung 50 polegadas..."
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <p class="text-xs text-gray-400 mt-1">
              {{ novaSolicitacao.descricaoEquipamento.length }}/100 caracteres
            </p>
          </div>

          <!-- Categoria -->
          <div>
            <label for="categoriaEquipamento" class="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="categoriaEquipamento"
              name="categoriaEquipamento"
              [(ngModel)]="novaSolicitacao.categoriaEquipamento"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="" disabled selected>Selecione a categoria do equipamento</option>
              <option value="Informática">Informática</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Eletrodomésticos">Eletrodomésticos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <!-- Descrição do defeito -->
          <div>
            <label for="descricaoDefeito" class="block text-sm font-medium text-gray-700">
              Descrição do defeito
            </label>
            <textarea
              id="descricaoDefeito"
              name="descricaoDefeito"
              rows="4"
              maxlength="500"
              [(ngModel)]="novaSolicitacao.descricaoDefeito"
              required
              placeholder="Descreva detalhadamente o problema encontrado no equipamento..."
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            ></textarea>
            <p class="text-xs text-gray-400 mt-1">
              {{ novaSolicitacao.descricaoDefeito.length }}/500 caracteres
            </p>
          </div>

          <!-- Botões -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              (click)="cancelarSolicitacao()"
            >
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="!formSolicitacao.form.valid"
              class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center"
            >
              ✈ Enviar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SolicitacaoManutencaoComponent {
  solicitacoes: SolicitacaoManutencao[] = [];

  novaSolicitacao: SolicitacaoManutencao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: '',
    dataHora: new Date(),
    estado: 'ABERTA'
  };

  registrarSolicitacao() {
    this.novaSolicitacao.dataHora = new Date();
    this.novaSolicitacao.estado = 'ABERTA';
    this.solicitacoes.push({ ...this.novaSolicitacao });

    alert('Solicitação registrada com sucesso!');

    this.novaSolicitacao = {
      descricaoEquipamento: '',
      categoriaEquipamento: '',
      descricaoDefeito: '',
      dataHora: new Date(),
      estado: 'ABERTA'
    };
  }

  cancelarSolicitacao() {
    this.novaSolicitacao = {
      descricaoEquipamento: '',
      categoriaEquipamento: '',
      descricaoDefeito: '',
      dataHora: new Date(),
      estado: 'ABERTA'
    };
  }
}
