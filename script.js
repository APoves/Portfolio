or, vuelve a intentarlo.';
      statusDiv.className = 'error';
    }
  } catch {
    statusDiv.textContent = 'Error de red. Por favor, vuelve a intentarlo.';
    statusDiv.className = 'error';
  }
});
