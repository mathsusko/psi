import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CardEstoqueService from '@/api/card-estoque';

interface ModalEditarItemProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: any;
  onSave: () => void;
}

export function ModalEditarItem({
  open,
  onOpenChange,
  item,
  onSave,
}: ModalEditarItemProps) {
  const [codigo, setCodigo] = useState(item?.codigo || '');
  const [descricao, setDescricao] = useState(item?.descricao || '');
  const [medida, setMedida] = useState(item?.medida || '');
  const [ncm, setNcm] = useState(item?.ncm || '');
  const [codigoFabrica, setCodigoFabrica] = useState(item?.codigoFabrica || '');
  const [quantidade, setQuantidade] = useState(item?.quantidade || 0);
  const [precoUnitario, setPrecoUnitario] = useState(item?.precoUnitario || 0);

  useEffect(() => {
    if (item) {
      setCodigo(item.codigo);
      setDescricao(item.descricao);
      setMedida(item.medida);
      setNcm(item.ncm);
      setCodigoFabrica(item.codigoFabrica);
      setQuantidade(item.quantidade);
      setPrecoUnitario(item.precoUnitario);
    }
  }, [item]);

  const handleSave = async () => {
    if (!codigo || !descricao || !quantidade || !precoUnitario) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Crie um objeto com os dados atuais
    const updatedData = {
      codigo,
      descricao,
      medida,
      ncm,
      codigoFabrica,
      quantidade,
      precoUnitario,
    };

    // Verifique se houve mudanças em relação ao item original
    const changes: any = {};

    // Verifique e adicione os campos alterados ao objeto de mudanças
    Object.keys(updatedData).forEach(key => {
      if (updatedData[key] !== item[key]) {
        changes[key] = updatedData[key];
      }
    });

    // Se não houver alterações, não faz sentido enviar a requisição
    if (Object.keys(changes).length === 0) {
      alert('Nenhuma alteração detectada.');
      return;
    }

    try {
      // Atualiza os dados do item, enviando apenas os campos alterados
      await CardEstoqueService.editarItem(item.cardId, item._id, changes);
      onSave(); // Notifica o componente pai que a edição foi salva
      onOpenChange(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Erro ao salvar o item. Tente novamente.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <h2 className="text-lg font-semibold">Editar Item</h2>

        {/* Campos do Formulário */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Código</label>
          <Input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Medida</label>
          <Input
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">NCM</label>
          <Input
            value={ncm}
            onChange={(e) => setNcm(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Código de Fábrica</label>
          <Input
            value={codigoFabrica}
            onChange={(e) => setCodigoFabrica(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Quantidade</label>
          <Input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Preço Unitário</label>
          <Input
            type="number"
            value={precoUnitario}
            onChange={(e) => setPrecoUnitario(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 text-white">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
